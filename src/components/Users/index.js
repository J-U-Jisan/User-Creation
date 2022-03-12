import React, { useState } from 'react'

export default function Users(props) {

    let data = props.data
    const totalRecords = data.length
    const initialPageFilter = {
        numberOfRecordsPerPage: 5,
        numberOfPages: Math.ceil(totalRecords / 5)
    }
    const [pageFilter, setPageFilter] = useState(initialPageFilter)
    const [currentPage, setCurrentPage] = useState(1)
    const [sort, setSort] = useState("FirstName")

    let tableHeading = []
    let tableBody = []

    const handleNumberOfRecordsPerPage = (e) => {
        setPageFilter({
            'numberOfRecordsPerPage': e.target.value,
            'numberOfPages': Math.ceil(totalRecords / e.target.value)
        })
        setCurrentPage(1)
    }

    const handlePreviousPage = () => {
        setCurrentPage(Number(currentPage) - 1)
    }

    const handleNextPage = () => {
        setCurrentPage(Number(currentPage) + 1)
    }

    if (data.length) {
        const header = Object.keys(data[0])

        tableHeading.push(<th key={1}>Name</th>)
        header.map((item, index) => {
            if (!(item === 'FirstName' || item === 'LastName'))
                tableHeading.push(<th key={index}>{item}</th>)
        })

        data.sort((a, b) => {
            const result = a[sort].localeCompare(b[sort])
            return result
        })
        console.log(data)

        const firstIndex = (currentPage - 1) * pageFilter.numberOfRecordsPerPage
        const lastIndex = Math.min(firstIndex + pageFilter.numberOfRecordsPerPage, totalRecords)

        for (let x = firstIndex; x < lastIndex; x++) {
            let tableRow = []
            header.map((item, idx) => {
                if (!(item === 'FirstName' || item === 'LastName'))
                    tableRow.push(<td key={idx}>{data[x][item]}</td>)
                else if (item === 'FirstName') {
                    tableRow.push(<td key={idx}>{data[x]['FirstName'] + ' ' + data[x]['LastName']}</td>)
                }
            })
            tableBody.push(<tr key={x}>{tableRow}</tr>)
        }
    }
    return (
        <div className='my-3'>
            <h3>Users List</h3>
            <div className='m-auto col-md-11'>
                <p className='bg-danger'>{data.length === 0 ? 'No User' : ''}</p>

                <div className='col-5 col-sm-4 float-end' style={data.length === 0 ? {display: 'none'}: {}}>
                    <label className='mt-1'>Sort By</label>
                    <div className='col-8 col-sm-8 float-end'>
                        <select className='form-select' onChange={(e) => setSort(e.target.value)}>
                            <option value="FirstName">First Name</option>
                            <option value="LastName">Last Name</option>
                            <option value="DateOfBirth">Date of Birth</option>
                        </select>
                    </div>
                </div>
                <div className='my-2'>
                    <table className='table table-hover mt-4'>
                        <thead className='thead-dark'>
                            <tr>
                                {tableHeading}
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                </div>
                <div className='my-2' style={data.length === 0 ? {display: 'none'}: {}}>
                    <div className='col-md-4 d-inline-block'>
                        <p className='text-start'>Page <span className='fw-bold'>{currentPage} of {pageFilter.numberOfPages}</span></p>
                    </div>
                    <div className='col-md-8 d-inline-block text-end'>
                        <button onClick={handlePreviousPage} disabled={currentPage === 1 ? true : false} className="btn btn-secondary mx-1">&#60;</button>
                        <button onClick={handleNextPage} disabled={currentPage === pageFilter.numberOfPages ? true : false} className="btn btn-secondary mx-1" >&#62;</button>
                        <div className='col-2 col-sm-2 d-inline-block ms-2'>
                            <select name="numberOfRecordsPerPage" className="form-select" value={pageFilter.numberOfRecordsPerPage} onChange={handleNumberOfRecordsPerPage}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
