/**
 * Analytics categories and events. Used when building actions in
 */
export const analyticsCategories = {
  borrow: 'BookReader-ReadingBorrow',
  browse: 'BookReader-ReadingBrowse',
  preview: 'BookReader-Preview',
  satisfactionMetric: 'DetailsPage-Book',
  bookReaderHeader: 'BookReader-Header',
  adminAccess: 'Admin-Access',
} as const;

export const analyticsActions = {
  browse: 'Borrow-1Hour',
  browseAgain: 'Borrow-Again',
  browseRenew: 'BookRenew',
  browseReturn: 'BookReturn',
  borrow: 'Borrow-14Days',
  waitlistJoin: 'JoinWaitlist',
  waitlistLeave: 'LeaveWaitlist',
  doneBorrowing: 'ReturnBook',
  login: 'LogIn',
  purchase: 'BWBPurchase',
  unavailable: 'Book-Unavailable',
  printDisability: 'Print-Disability',
  titleBar: 'Book-Title-Bar',
} as const;

export const analyticsLabels = {
  browseAutoRenew: 'BookAutoRenew',
  browseAutoReturn: 'BookAutoReturn',
  browseManualRenew: 'BookManualRenew',
  browseManualReturn: 'BookManualReturn',
} as const;
