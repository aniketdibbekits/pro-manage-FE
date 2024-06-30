import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
export const personApiSlice = createApi({
  reducerPath: "personapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/", // Change to your base URL
    prepareHeaders: (headers) => {
        const userInfo = Cookies.get("userInfo");
        console.log(userInfo)
        const { token } = JSON.parse(userInfo);
        if (token) {
          headers.set(`authorization`, ` Bearer ${token}`);
        }
        console.log(token)
        return headers;
      },
  }),
  tagTypes: ["Person"],
  endpoints: (builder) => ({
    createPerson: builder.mutation({
      query: (data) => ({
        url: `person/persons`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Person"],
    }),
    getAllPersons: builder.query({
      query: () => ({
        url: `person/persons`,
        method: "GET",
        
      }),
      providesTags: ["Person"],
    }),
  }),
});

export const { useCreatePersonMutation, useGetAllPersonsQuery } = personApiSlice;
