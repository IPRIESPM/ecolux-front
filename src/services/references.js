const serverPath = 'http://vps-3547869-x.dattaweb.com:3030/api/reference';

export const getReferencesFromApi = async (data) => {
  const url = serverPath;
  try {
    const response = await fetch(url, {
      method: 'GET',
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

export const searchReferenceFromApi = async (data) => {
  const url = `${serverPath}/search/${data}`;
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

export const createReferenceFromApi = async (data) => {
  const url = serverPath;
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        authorization: `Bearer ${data.token}`,
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

export const deleteReferenceFromApi = async (data) => {
  const url = `${serverPath}/${data.id}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${data.token}`,
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

export const deleteReferenceRackFromApi = async (data) => {
  const url = `http://vps-3547869-x.dattaweb.com:3030/api/rackReference/${data.id}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${data.token}`,
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

export const getReferenceByIdFromApi = async (id) => {
  const url = `${serverPath}/${id}`;
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

export const updateReferenceFromApi = async (data) => {
  const url = `${serverPath}/${data.id}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        authorization: `Bearer ${data.token}`,
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

export const getReferenceRackByIdFromApi = async (data) => {
  const url = `http://vps-3547869-x.dattaweb.com:3030/api/rackReference/${data.id}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${data.token}`,
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

export const updateReferenceRackFromApi = async (data) => {
  const url = `http://vps-3547869-x.dattaweb.com:3030/api/rackReference/${data.referenceRack}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 304) {
      return 304;
    }

    return true;
  } catch (error) {
    return false;
  }
};
