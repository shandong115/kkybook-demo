const bookcity = {
  state: {
    totalPages: 0,
    currentPage: 1,
    pageItems: null
  },
  mutations: {
    SET_TOTAL_PAGES: (state, totalPages) => {
      state.totalPages = totalPages
    },
    SET_CURRENT_PAGE: (state, currentPage) => {
      state.currentPage = currentPage
    },
    SET_PAGE_ITEMS: (state, pageItems) => {
      state.pageItems = pageItems
    }
  }
}

export default bookcity
