const serverPath = 'http://localhost:3030/api/sections';

export const getSectionsByAisleId = async (id) => {
  const url = `${serverPath}/aisle/${id}`;
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
    if (response.status === 304) {
      return 304;
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return false;
  }
};

export const getSections = async () => {
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

export const getSectionById = async (data) => {
  const { id, token } = data;
  const url = `${serverPath}/${id}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 304) {
      console.log('304');
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

export const createSection = async (data) => {
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

export const deleteSectionFromApi = async (data) => {
  const url = `${serverPath}/${data.id}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return false;
    }
    if (response.status === 304) {
      return 304;
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return false;
  }
};

export const updateSection = async (data) => {
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
    if (!response.ok) {
      return false;
    }
    if (response.status === 304) {
      return 304;
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return false;
  }
};
