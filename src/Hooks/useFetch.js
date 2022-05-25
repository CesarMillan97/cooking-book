import { useEffect, useState } from "react"

export const useFetch = (url, method = "GET") => {
   const [data, setData] = useState()
   const [error, setError] = useState(null)
   const [isPending, setIsPending] = useState(false)
   const [options, setOptions] = useState(null)

   const postData = (postData) => {
      setOptions({
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         }, 
         body: JSON.stringify(postData)
      })
   }
   
   useEffect(() => {
      const controller = new AbortController()
      const fetchData = async (fetchOptions) => {
         setIsPending(true)

         try {
            const response = await fetch(url, {...fetchOptions, signal: controller.signal })
            if (!response.ok) {
               throw new Error (response.statusText)
            }
            const data = await response.json()
            setData(data)
            setError(null)
            setIsPending(false)
         } catch (err) {
            setIsPending(false)
            if (err.name === "AbortError") {
               console.log("The fetch was aborted");
            } else {
               setError('Could not fetch data')
            }
         }
      }

      if (method === "GET") {
         fetchData()
      }
      if (method === "POST" && options) {
         fetchData(options)
      }

      return () => {
         controller.abort()
      }

   }, [url, options, method])
   return { data, error, isPending, postData }
}