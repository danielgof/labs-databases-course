import React, { useState, useEffect } from 'react';

const NumVisitors = () => {
    const [data, getData] = useState([])
    const URL = 'http://127.0.0.1:5000/api/v1/num_visits';
  
    useEffect(() => {
        fetchData()
    }, [])
  
    const fetchData = () => {
      fetch(URL)
        .then((res) =>
            res.json())
        .then((response) => {
            // console.log(response.result);
            getData(response);
        })
    }
    // console.log(data.visited);
  return (
    <div>
      Портал был посещён раз: {data.visited}
    </div>
  )
}
export default NumVisitors;