const serverPath = 'http://localhost:3030/altura';

export const getRacksFromAPI = async () => {
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

export const getRackByIdFromAPI = async (sectionId) => {
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

export const updateRackFromAPI = async (section) => {
  try {
    const url = `${serverPath}/${section.id}`;
    const data = {
      name: section.name,
      description: section.description,
      sectionId: section.section_id,
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

export const createRackFromAPI = async (rack) => {
  try {
    const url = serverPath;
    const data = {
      name: rack.name,
      description: rack.description,
      sectionId: rack.section_id,
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

export const deleteRackFromAPI = async (sectionId) => {
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

export const getRacksBySectionIdFromAPI = async (sectionId) => {
  try {
    const url = `${serverPath}/section/${sectionId}`;
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
