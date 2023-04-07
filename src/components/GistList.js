import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ErrorContext } from '../contexts/Error/Context'
import useCacheRequest from '../customHooks/useCacheRequest'
import { getPublicGists } from '../services/gistService'
import Gist from './Gist/Gist'
import Loader from './MyLoader/Loader'
const GistList = () => {

    const [list, setList, isLoading, failure] = useCacheRequest(getPublicGists, "secretKey")
    const [error, setError] = useContext(ErrorContext)
    const { state } = useLocation();

    // To render list from search bar
    useEffect(() => {
        if (state) {
            const { gistsForUser } = state
            setList(gistsForUser)
        }
    }, [state])

    // To check if the getAllGist request worked fine if not setError to render the errorpage
    useEffect(() => {
        if (failure.state) {
            setError(failure)
        }
    }, [failure])

    //To set the no results found once data is fetched successfully and no record is fetched
    useEffect(() => {
        if (list == null) return
        if (list.length == 0) {
            setError({
                state: true,
                msg: "No Results Found"
            })
        }
    }, [list])

    return <>

        {isLoading ? // rendering the loader till the data is fetched 
            <Loader /> :
            list && list.map((item, index) => {
                return <div key={index}>
                    <Gist gist={item} />
                </div>
            })
        }
    </>
}

export default GistList
