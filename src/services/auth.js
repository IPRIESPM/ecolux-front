const serverPath = 'http://vps-3547869-x.dattaweb.com:3030/api/login';

const loginInApi = async (data) => {
  const url = serverPath;
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 304) {
      return 304;
    }

    if (!response.ok) {
      return false;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return false;
  }
};

export default loginInApi;
