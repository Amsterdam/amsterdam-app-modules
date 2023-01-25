/* eslint-disable max-len */
export type ModuleIconName = keyof typeof ModuleIconPath
export type IconName = keyof typeof VariousIconPath | ModuleIconName

export enum ModuleIconPath {
  alert = 'm15.9 2.3-16 28.6h32l-16-28.6zm0 8.4 9 16.1h-18l9-16.1zm-1 5.9h2v5.1h-2v-5.1zm2 8.1v-2h-2v2h2z',
  announcement = 'M23 0v11.6c1.8.6 3 2.3 3 4.2s-1.2 3.6-3 4.2v11.6L12.6 26l-5.2 5.2-2.8-2.8 4.3-4.3-1.5-.8H0v-15h7.4L23 0zM4 12.3v7h4v-7H4zM19 25l-9-4.8v-8.7l9-4.8V25zM29.4 8.1l-3.1 3.1 1.4 1.4 3.1-3.1-1.4-1.4zm-1.7 11-1.4 1.4 3.1 2.9 1.4-1.4-3.1-2.9zm.3-4.3h4v2h-4v-2z',
  chatting = 'M23.4 7h-15V5.5h15V7zm-4 1.5h-11V10h11V8.5zm10-7v13h-9v5l-5-5h-13v-13h27zm-2 2h-23v9h23v-9zm-2.5 24h-3.7c-2.1 0-3.6.9-3.6 3.6v.9h11v-.9c0-2.7-1.6-3.6-3.7-3.6zm.9-3.7c.2-1.1-.3-2.2-1.2-2.9-.9-.6-2.2-.6-3.1 0s-1.4 1.8-1.2 2.9c.3 1.3 1.4 2.3 2.8 2.3s2.4-1 2.7-2.3zm-14.9 3.7H7.2c-2.1 0-3.6.9-3.6 3.6v.9h11v-.9c0-2.7-1.6-3.6-3.7-3.6zm.9-3.7c.2-1.1-.3-2.2-1.2-2.9s-2.2-.6-3.1 0-1.4 1.8-1.2 2.9c0 .7.3 1.4.8 1.9s1.2.8 2 .8c1.5 0 2.7-1.2 2.7-2.7z',
  checkmark = 'M12.1 27-.1 14.2l2.9-2.8 9.3 9.8L29 4l2.9 2.8L12.1 27z',
  facade = 'M22.6 9.5V7.8h-1.1V6.4h-1V4.9h-.9V3.5h-1.1V2.2h-1V1h-2.9v1.2h-1v1.3h-1V4.9h-1v1.5h-1v1.4h-1v1.7h-1V31h15.3V9.5h-1.3zM13.7 6h4.6v4h-4.6V6zm1.2 22.9h-4v-8h4v8zm0-9.9h-4v-7h4v7zm6.2 9.9h-4v-8h4v8zm0-9.9h-4v-7h4v7z',
  info = 'M15.9 2c-7.7 0-14 6.3-14 14s6.3 14 14 14 14-6.3 14-14-6.3-14-14-14zm0 24c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10zm-1-15h2V9h-2v2zm0 12h2V13h-2v10z',
  'organic-waste-container' = 'M23.2 4.8C22.9 2.1 19.6 0 15.7 0S8.5 2.2 8.1 4.8H7V30H3.9v2h24v-2h-3.2V4.8h-1.5zM12.3 2.4h6.9v6.9h-6.9V2.4zM22.7 29H9V12.6h13.7V29z',
  projects = 'm31.2 26.7-2.3-2.4-1.6 1.5-3.2-3.2-4-12.8c-.2-.7-.5-1.3-1.1-1.8l-3.8-3.7-.4-.4L13 2.1l-.3-.3L7 7.9l2.4 2.4 2.2 2.2-2.7 3.9L0 31.7h4l7-12.1 4.2 4.4v7.7h3.5v-9.1L15 18.8l1.2-1.7L26 27l-1.6 1.4 2.2 2.5c.6.6 1.4.9 2.2 1 .8.1 1.7-.2 2.3-.9.6-.6 1-1.3 1-2.2 0-.7-.3-1.5-.9-2.1zM10.6 9.1l2.2-2.3 1.7 1.7-1.8 2.5-2.1-1.9zm7.7 4.8 1.3 4-2.4-2.4 1.1-1.6z M17.5,4a3.2,3.2 0 1,0 6.4,0a3.2,3.2 0 1,0 -6.4,0',
  'trash-bin' = 'M21,4h8v4h-2v24H5V8H3V4h8V0h10V4z M19,2h-6v2h6V2z M23,28H9V8h14V28z M13,12h-2v12h2V12z M15,12h2v12h-2V12z M21,12h-2v12h2V12z',
}

export enum VariousIconPath {
  logout = 'M14.371 0v4H4.377v24h9.994v4H.38V0H14.37Zm5.996 9.64 2.819-2.83L32.38 16l-9.194 9.19-2.819-2.83L24.725 18H6.376v-4h18.349l-4.358-4.36Z',
  spinner = 'M16.3 5c2.2 0 4.3.7 6.1 1.9 1.8 1.2 3.2 3 4 5 .8 2 1 4.2.6 6.4-.4 2.1-1.5 4.1-3.1 5.6s-3.5 2.6-5.7 3c-2.1.4-4.3.2-6.3-.7-2-.9-3.7-2.3-4.9-4.1-1.2-1.8-1.8-4-1.8-6.1',
}

export const IconPath = {...ModuleIconPath, ...VariousIconPath}

export const moduleIconNames = Object.keys(ModuleIconPath)
