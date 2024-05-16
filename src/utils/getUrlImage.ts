export const getImage = (url: string) => {
  const defaultImage =
    'https://img.freepik.com/premium-vector/office-paper-document-with-folder-flat-design_798171-579.jpg';

  const fileExtensions = ['.txt', '.docx', '.pdf'];
  const fileExtensions2 = ['.txt', '.docx', '.pdf', '.png', '.jpg', '.jpeg', '.gif'];

  if (!url || fileExtensions.some(ext => url.endsWith(ext))) {
    return defaultImage;
  }

  if (!fileExtensions2.includes(url.slice(-4))) {
    return 'https://t4.ftcdn.net/jpg/02/48/64/07/360_F_248640765_bCNb7VWFt5NFVRTw5nyWKF4RE7NauguM.jpg';
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  return `https://ll6zw4n2-3000.use2.devtunnels.ms${url}`;
};
