import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useTable,useSortBy,useGlobalFilter,usePagination} from 'react-table'
import { COLUMNS } from '../DataTables/Coulmn'
import { getEmployeeAction } from '../../actions/EmployeeActions'
import { FcAlphabeticalSortingAz } from "react-icons/fc"
import { FcAlphabeticalSortingZa } from "react-icons/fc"
import GlobalFilter from './GlobalFilter'


export default function SortingTable() {

    const dispatch = useDispatch();

    const empdata = useSelector(state => state.EmployeeReducer)
    console.log("EMPDATA", empdata)

    const { loading, error, employee } = empdata

    useEffect(() => {
        dispatch(getEmployeeAction())
    }, [dispatch])

    const tableinstance = useTable({
        columns: COLUMNS,
        data: employee,
    },useGlobalFilter,useSortBy,usePagination)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        
        //rows,
        prepareRow,state,setGlobalFilter } = tableinstance

    const {globalFilter,pageIndex,pageSize} =state

    
    return (
        <>
            <div className="container-fluid card shadow-lg mt-4 mb-3">
                <div className="row">
                    <div className="col-md-8">
                        <GlobalFilter filter={globalFilter} setfilter={setGlobalFilter}/>
                    </div>
                    <div className="col-md-4 mt-4">
                        <button type="button" className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Add Employee
                        </button>
                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        ...
                                </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Understood</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        {
                            (loading) && (<Typography variant="h3" color="secondary" className="text-center">LOADING....</Typography>)
                        }
                        {
                            (error) && (<Typography variant="h3" color="secondary" className="text-center">something went wrong</Typography>)
                        }

                        {
                            employee.length === 0 ?
                                <Typography variant="h3" color="secondary" className="text-center">NO DATA</Typography>
                                :
                                <div className="container-fluid table-responsive mt-3 mb-3">
                                    <div className="card">

                                        <div className="card-body">
                                            <table className="table table-hover table-bordered" {...getTableProps()}>
                                                <thead className="table-primary">
                                                    {
                                                        headerGroups.map((headerGroup) => (
                                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                                                {
                                                                    headerGroup.headers.map((column) => {
                                                                        return <th {...column.getHeaderProps(column.getSortByToggleProps())} className="text-center">
                                                                            {column.render('Headers')}
                                                                            <span> {column.isSorted?(column.isSortedDesc ? <FcAlphabeticalSortingZa/>:<FcAlphabeticalSortingAz/>):''}</span>
                                                                        </th>
                                                                    })
                                                                }

                                                            </tr>
                                                        ))
                                                    }
                                                </thead>
                                                <tbody {...getTableBodyProps()}>
                                                    {
                                                        page.map((row) => {
                                                            prepareRow(row)
                                                            return (
                                                                <tr {...row.getRowProps()}>
                                                                    {
                                                                        row.cells.map((cell) => (
                                                                            <>
                                                                                <td {...cell.getCellProps()} className="text-center">
                                                                                    {cell.render('Cell')}

                                                                                </td>

                                                                            </>
                                                                        ))
                                                                    }

                                                                </tr>
                                                            )
                                                        })
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div>
                                        <span>
                                            Page{' '}
                                            <strong>
                                                {pageIndex+1} of {pageOptions.length}
                                            </strong>
                                        </span>

<span>
<select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
{
    [10,20,30].map(pageSize =>(
        <option key={pageSize} value={pageSize}>
        Show {pageSize}
        </option>
    ))
}
</select>
</span>
                                        <span>
                                        Go to Page:{''}
                                        <input
                                        type="number"
                                        defaultValue={pageIndex+1}
                                        onChange={(e) =>{
                                            const pageNumber =e.target.value ?Number(e.target.value)-1:0
                                            gotoPage(pageNumber)
                                        }}
                                        style={{width:'50px'}}
                                        />
                                        </span>
                                        <button 
                                            type="button" 
                                            className="btn btn-sm" 
                                            onClick={() => gotoPage(0)} disabled={!canPreviousPage}
                                        >
                                            {'<<'}
                                        </button>
                                        <button type="button" className="btn btn-primary btn-lg" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                                        <button type="button" className="btn btn-primary btn-lg" onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                                    </div>

                                    <button type="button" 
                                    className="btn btn-sm" 
                                    onClick={() => gotoPage(pageCount-1)} 
                                    disabled={!canNextPage}
                                    >
                                        {'>>'}
                                    </button>

                                </div>
                        }
                    
                </div>
            </div>
        </>
    )
}
