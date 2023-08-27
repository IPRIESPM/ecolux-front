const serverPath = 'http://localhost:3030/seccion';

export const getSectionsFromAPI = async () => {
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

export const getSectionByIdFromAPI = async (sectionId) => {
  try {
    const url = `${serverPath}/${sectionId}`;
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

export const updateSectionFromAPI = async (section) => {
  try {
    const url = `${serverPath}/${section.id}`;
    const data = {
      name: section.name,
      description: section.description,
      pasilloId: section.pasillo_id,
      id: section.id,
    };
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
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

export const createSectionFromAPI = async (section) => {
  try {
    const url = serverPath;
    const data = {
      name: section.name,
      description: section.description,
      pasilloId: section.pasillo_id,
    };
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
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

export const deleteSectionFromAPI = async (sectionId) => {
  try {
    const url = `${serverPath}/${sectionId}`;
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

export const getSectionsByAisleFromAPI = async (pasilloId) => {
  try {
    const url = `${serverPath}/pasillo/${pasilloId}`;
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
