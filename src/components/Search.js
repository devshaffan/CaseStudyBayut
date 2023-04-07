import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'
import { getGistForUser } from '../services/gistService'
import { useNavigate } from 'react-router-dom';
import { ErrorContext } from '../contexts/Error/Context';


const Search = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("")
  const [error, setError] = useContext(ErrorContext)

  useEffect(() => {
    console.log("i am here")
    if (searchText == "") {
      console.log("i am inside")
      setError({
        state: false,
        msg: ""
      })
      navigate("/")
      return
    }
    const timeOutID = setTimeout(async () => {
      await callApi(searchText)
    }, 1000)
    return () => clearTimeout(timeOutID)
  }, [searchText])

  const callApi = async (userName) => {
    try {
      const result = await getGistForUser(userName)
      if (result.data.length == 0) {
        setError({
          state: true,
          msg: "No User Found"
        })
        return
      }
      navigate("/", { state: { gistsForUser: result.data } })
    }
    catch (error) {
      setError({
        state: true,
        msg: ""
      })
    }
  }
  const handleChange = (e) => {
    setSearchText(e.target.value)
  }
  return (
    <Wrapper>
      <InputBox>
        <Octicon name="search" />
        <Input placeholder="Search Gists for the username" onChange={handleChange} value={searchText} />
      </InputBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 8px;
  background-color: #ffffff;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 6px;
  margin: 0 16px;
`;

const InputBox = styled.div`
  border-radius: 4px;
  display: flex;
  width: 400px;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  font-size: 16px;

  &:focus{
    outline: 0;
  }
`;

export default Search
