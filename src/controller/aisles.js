const serverPath = 'http://localhost:3030/pasillo';
export const getAislesFromAPI = async () => {
  const url = serverPath;
  try {
    const response = await fetch(url, {
      method: 'GET',
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

export const getAisleByIdFromAPI = async (id) => {
  const url = `${serverPath}/${id}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return false;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return false;
  }
};

export const createAisleOnAPI = async (aisle) => {
  try {
    const response = await fetch(serverPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aisle),
    });

    if (!response.ok) {
      return false;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return false;
  }
};

export const updateAisleOnAPI = async (aisle) => {
  const url = `${serverPath}/${aisle.id}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aisle),
    });

    if (!response.ok) {
      return false;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return false;
  }
};

export const deleteAisleOnAPI = async (id) => {
  const url = `${serverPath}/${id}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};
