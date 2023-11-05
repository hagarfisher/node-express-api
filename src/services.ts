import { Request, Response, query } from "express";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { sign } from "jsonwebtoken";
import { secret } from "./middleware/authJwt";
import { cache } from "./cacheHandler";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const response = await axios.post<{ id: number; token: string }>(
      `${process.env.EXTERNAL_API_URL}${req.path}`,
      {
        email,
        password,
      }
    );
    const externalToken = response.data.token;
    const id = response.data.id;
    const token = sign({ token: externalToken, id }, secret, {
      expiresIn: "1d",
    });

    return res.status(HttpStatusCode.Ok).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(HttpStatusCode.NotFound).json("something went wrong!");
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const { page } = req.params;
  try {
    const response = await axios.get(`${process.env.EXTERNAL_API_URL}/users`, {
      params: { page },
    });
    return res.status(HttpStatusCode.Ok).json(response.data.data);
  } catch (err) {
    console.error(err);
    return res.status(HttpStatusCode.NotFound).json("something went wrong!");
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { data } = await axios.get(
      `${process.env.EXTERNAL_API_URL}/users/${id}`
    );
    cache.set(id, data);

    return res.status(HttpStatusCode.Ok).json(data);
  } catch (err) {
    console.error(err);
    return res.status(HttpStatusCode.NotFound).json("something went wrong!");
  }
};

export const createUser = async (
  req: Request<any, any, Record<string, string>>,
  res: Response
) => {
  // create user doesn't actually create a user, it just returns the id and createdAt
  // so we don't need to cache it, otherwise I would have used the same caching logic as getUser
  const params = req.body;
  try {
    const { data } = await axios.post<
      {
        id: string;
        createdAt: string;
      } & typeof params
    >(`${process.env.EXTERNAL_API_URL}/users`, {
      ...params,
    });
    return res.status(HttpStatusCode.Created).json(data);
  } catch (err) {
    console.error(err);
    return res.status(HttpStatusCode.NotFound).json("something went wrong!");
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const params = req.body;
  try {
    const { data } = await axios.put(
      `${process.env.EXTERNAL_API_URL}/users/${id}`,
      {
        ...params,
      }
    );
    cache.set(id, data);
    return res.status(HttpStatusCode.Ok).json(data);
  } catch (err) {
    console.error(err);
    cache.del(id);
    return res.status(HttpStatusCode.NotFound).json("something went wrong!");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await axios.delete(`${process.env.EXTERNAL_API_URL}/users/${id}`);
    return res.status(HttpStatusCode.Ok).send();
  } catch (err) {
    console.error(err);
    return res.status(HttpStatusCode.NotFound).json("something went wrong!");
  } finally {
    cache.del(id);
  }
};
