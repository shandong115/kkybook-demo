const bookcity = {
  state: {
    totalPages: 0,
    currentPage: 1,
    pageItems: null,
    isRouterAlive: true,
    item: null
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
    },
    SET_IS_ROUTER_ALIVE: (state, isRouterAlive) => {
      state.isRouterAlive = isRouterAlive
    },
    SET_ITEM: (state, item) => {
      state.item = item
    }
  }
}

export default bookcity
