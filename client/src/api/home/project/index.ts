



/*
  ____  ____   ___      _ _____ ____ _____      _    ____ ___ 
 |  _ \|  _ \ / _ \    | | ____/ ___|_   _|    / \  |  _ \_ _|
 | |_) | |_) | | | |_  | |  _|| |     | |     / _ \ | |_) | | 
 |  __/|  _ <| |_| | |_| | |__| |___  | |    / ___ \|  __/| | 
 |_|   |_| \_\\___/ \___/|_____\____| |_|   /_/   \_\_|  |___|
                                                              
*/

import serverPaths from "@/configs/paths/server.paths.config";


export const createProject = async (formData: FormData, accessToken: string) => {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  try {
    const response = await fetch(serverPaths.home.project.create, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ name, description }),
    });

    const data = await response.json()

    if (!response.ok) {
      const { message } = data
      throw new Error(message)
    }

    return data.data
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
  }
};


export const getAllProjects = async (accessToken: string) => {
  try {
    const response = await fetch(serverPaths.home.project.all, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
      },
    })
    const data = await response.json()

    if (!response.ok) {
      const { message } = data
      throw new Error(message)
    }

    return data?.data
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
  }

}

export const getProjectById = async (id: string, accessToken: string, signal: AbortSignal) => {
  try {
    const response = await fetch(serverPaths.home.project.id.replace(":id", id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      signal,
    })

    const data = await response.json()

    if (!response.ok) {
      const { message } = data
      throw new Error(message)
    }

    return data?.data
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return
      } else {
        throw new Error(error.message)
      }
    }
  }

}



export const deleteProjectById = async (id: string, accessToken: string) => {
  try {
    const response = await fetch(serverPaths.home.project.delete.replace(":id", id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      const { message } = data
      throw new Error(message)
    }

    return data?.data
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
  }
}
