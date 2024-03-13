import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegin } from '../apiActionCreator';

const initialState = {
  list: [],
  isLoading: false,
  error: null,
  searchList: [],
  createLoading: null,
  searchQuery: '', // For searching
  filter: '', // For filtering
  filterColumn: '',
  sortKey: '', // For sorting
  currentPage: 1, // For pagination
  itemsPerPage: 10, // For pagination - set as needed
  sortOrder: 'asc',
};

const usersSlice = createSlice({
  name: 'schedules',
  initialState,
  reducers: {
    schedulesRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    schedulesReceive: (state, action) => {
      state.list = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    schedulesRequestFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    schedulesSearchRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.searchList = [];
    },
    schedulesSearchReceive: (state, action) => {
      state.searchList = action.payload.data;
      state.error = null;
      state.isLoading = false;
    },
    schedulesSearchRequestFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.searchList = [];
    },
    createScheduleRequest: (state) => {
      state.createLoading = true;
      state.error = null;
    },
    createScheduleReceive: (state) => {
      state.error = null;
      state.createLoading = false;
    },
    createScheduleRequestFail: (state, action) => {
      state.createLoading = false;
      state.error = action.payload;
    },
    // New actions for searching, sorting, filtering, pagination
    setSearchQuery: (users, action) => {
      users.searchQuery = action.payload;
    },
    setFilter: (users, action) => {
      users.filter = action.payload;
    },
    setFilterColumn: (users, action) => {
      users.filterColumn = action.payload;
    },
    setSortKey: (users, action) => {
      users.sortKey = action.payload;
    },
    setCurrentPage: (users, action) => {
      users.currentPage = action.payload;
    },
    setItemsPerPage: (users, action) => {
      users.itemsPerPage = action.payload;
    },
    setSortOrder: (users, action) => {
      users.sortOrder = action.payload;
    },
  },
});

export const {
  schedulesReceive,
  schedulesRequest,
  schedulesRequestFail,
  schedulesSearchReceive,
  schedulesSearchRequest,
  schedulesSearchRequestFail,
  createScheduleReceive,
  createScheduleRequest,
  createScheduleRequestFail,
  setSearchQuery,
  setCurrentPage,
  setFilter,
  setFilterColumn,
  setItemsPerPage,
  setSortKey,
  setSortOrder,
} = usersSlice.actions;

export default usersSlice.reducer;

export const getSchedules = () => {
  return apiCallBegin({
    url: '/schedules/findAllSchedulesWithDetails',
    method: 'get',
    onSuccess: schedulesReceive.type,
    onStart: schedulesRequest.type,
    onError: schedulesRequestFail.type,
  });
};
export const searchSchedule = (query) => {
  return apiCallBegin({
    url: `/schedules/search?start=${query}`,
    method: 'get',
    onSuccess: schedulesSearchReceive.type,
    onStart: schedulesSearchRequest.type,
    onError: schedulesSearchRequestFail.type,
  });
};
export const createSchedule = (data) => {
  return apiCallBegin({
    url: `/schedules`,
    method: 'post',
    data,
    onSuccess: createScheduleReceive.type,
    onStart: createScheduleRequest.type,
    onError: createScheduleRequestFail.type,
  });
};
export const updateSchedule = (id, data) => {
  return apiCallBegin({
    url: `/schedules/${id}`,
    method: 'patch',
    data,
    onSuccess: createScheduleReceive.type,
    onStart: createScheduleRequest.type,
    onError: createScheduleRequestFail.type,
  });
};
export const deleteSchedule = (id) => {
  return apiCallBegin({
    url: `/schedules/${id}`,
    method: 'delete',
    onSuccess: createScheduleReceive.type,
    onStart: createScheduleRequest.type,
    onError: createScheduleRequestFail.type,
  });
};

// Selector with filtering, sorting, and pagination
export const selectFilteredAndSortedSchedule = (state) => {
  const {
    list,
    searchQuery,
    filter,
    filterColumn,
    sortKey,
    currentPage,
    itemsPerPage,
    sortOrder,
  } = state.entities.schedules;

  // Filtering

  let filteredList = list.filter(
    (user) =>
      user.start.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.finish.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Applying filter
  if (filter) {
    filteredList = filteredList.filter((user) => user[filterColumn] === filter);
  }


  // Sorting
  if (sortKey) {
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    filteredList.sort(
      (a, b) => multiplier * a[sortKey].localeCompare(b[sortKey])
    );
  }
  // Pagination
  const totalPages = Math.ceil(list.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  let endIndex = startIndex + itemsPerPage;
  if (endIndex >= list.length) endIndex = list.length;

  const paginatedList = filteredList.slice(startIndex, endIndex);

  return { paginatedList, totalPages, startIndex, endIndex };
};

/// selecter
export const selectSchedules = (state) => state.entities.schedules;
