import { useEffect, useState } from "react";


export default function useCacheRequest(endPoint, cacheKey, cacheDuration = 60000) {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [failure, setFailure] = useState({
        state: false,
        msg: ""
    })
    useEffect(() => {
        // Calling api
        console.log("i am at cache")
        handleApiCall()
        return
    }, [])

    const handleApiCall = async () => {
        try {
            // checking if the cahced data exist in store and is valid with the timestamp
            const { timeStamp = null, cachedData = null } = JSON.parse(localStorage.getItem(cacheKey)) || {}
            if (timeStamp && cachedData && validTimeStamp(timeStamp)) {
                setData(cachedData)
                setIsLoading(false)
            }
            else {
                // making loading true before api calling
                setIsLoading(true)
                let data = null
                // calling api to fetch fresh data
                data = (await callApi()).data
                if (data) {
                    cacheData(data)
                }
                setData(data)

                //making loading false once data is fetched or api is failed
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
            setFailure({
                state: true,
                msg: error.message
            })
        }
        return
    }
    const validTimeStamp = (timeStamp) => {
        const currentTimestamp = (new Date()).getTime()
        if (currentTimestamp < timeStamp) {
            return true
        }
        return false
    }
    const callApi = () => {
        return endPoint()
    }
    const cacheData = (data) => {
        console.log(data)
        const response = {
            cachedData: data,
            timeStamp: (new Date()).getTime() + cacheDuration
        }
        localStorage.setItem(cacheKey, JSON.stringify(response))
        return
    }
    return [data, setData, isLoading, failure]
}