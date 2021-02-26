import { Typography } from '@material-ui/core';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { getEmployeeAction } from '../../actions/EmployeeActions'
import { FcAlphabeticalSortingAz } from "react-icons/fc"
import { FcAlphabeticalSortingZa } from "react-icons/fc"

import GlobalFilter from './GlobalFilter'
import PropagateLoader from 'react-spinners/PropagateLoader'

import { FcNext } from "react-icons/fc"
import { FcPrevious } from "react-icons/fc"
import { POST_REQUEST, UPDATE_REQUEST } from '../../actions/EmployeeConstant'
import ModalDialog from '../../components/FormComponents/ModalDialog'
import { Image } from 'react-bootstrap'


export default function EmployeeList() {
    const [show, setshow] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [compId, setCompId] = useState(0);

    const closeModalBox = () => {
        setshow(false);
    };
    const openModalBox = () => {
        setshow(true);
    };

    const COLUMNS = useRef([
        // {
        //     Header: "LOGO",
        //     accessor: "LogoImage",
        //     Cell: ({ cell }) => (
        //         <Image
        //             src={cell.row.values.LogoImage}
        //             alt={cell.row.values.name}
        //             width={100}
        //             height={100}
        //             fluid
        //             rounded
        //         />
        //     ),
        // },
        {
            Headers: 'COMPANY',
            accessor: 'CompanyName'
        },
        {
            Headers: 'EMAIL',
            accessor: 'Email'
        },
        {
            Headers: 'STATE',
            accessor: 'State'
        },
        {
            Headers: 'CITY',
            accessor: 'City'
        },
        {
            Headers: 'ACTIONS',
            accessor: '_id',
            Cell: ({ cell }) => (
                <>
                    <button
                        className="btn btn-warning"
                        onClick={() => {
                            setCompId(cell.row.values._id);
                            setEditModal(true);
                        }}
                    >
                        Edit
                    </button>
                </>
            )
        },


    ])


    const dispatch = useDispatch();
    var empdata = useSelector(state => state.EmployeeReducer)
    console.log("EMPDATA", empdata)


    const { loading, error, employee } = empdata

    const { success: postSuccess } = useSelector((state) => state.PostEmployeeReducer);
    const { success: putSuccess } = useSelector((state) => state.updateEmployeeReducer);

    useEffect(() => {
        if (postSuccess) {
            dispatch({ type: POST_REQUEST });
        }
        if (putSuccess) {
            dispatch({ type: UPDATE_REQUEST });
        }
        dispatch(getEmployeeAction())

    }, [dispatch, postSuccess, putSuccess]);




    const newcolumns = useMemo(() => COLUMNS.current, [
        COLUMNS,
    ]);
    // const data = useMemo(() => (compData ? compData : []), [compData]);
    const tableinstance = useTable({
        columns: newcolumns,
        data: employee,
    }, useGlobalFilter, useSortBy, usePagination)

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
        prepareRow, state, setGlobalFilter } = tableinstance

    const { globalFilter, pageIndex, pageSize } = state


    return (
        <>
            <ModalDialog showFlag={show} handleClose={closeModalBox} />

            {/* For Edit */}
            <ModalDialog
                showFlag={editModal}
                isEdit={true}
                compId={compId}
                handleClose={() => setEditModal(false)}
            />
            <div className="container-fluid card shadow-lg mt-4 mb-3">
                <div className="row">
                    <div className="col-md-3">

                    </div>
                    <div className="col-md-7">
                        <GlobalFilter filter={globalFilter} setfilter={setGlobalFilter} />
                    </div>
                    <div className="col-md-2">
                        <button type="button" className="btn btn-primary mt-4" onClick={() => {
                            openModalBox();
                        }}>Add</button>
                    </div>

                    {
                        (loading) && (<div className="m-2 d-flex justify-content-center">
                            <PropagateLoader size={10} color={'#9013FE'} />
                        </div>)
                    }
                    {
                        (error) && (<Typography variant="h5" color="secondary" className="text-center">Something went wrong</Typography>)
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
                                                                        <span> {column.isSorted ? (column.isSortedDesc ? <FcAlphabeticalSortingZa /> : <FcAlphabeticalSortingAz />) : ''}</span>
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

                                <div className="container-fluid" style={{ border: '2px solid red' }}>
                                    <div className="row">
                                        <div className="col-md-12">


                                            <div className="form-group">
                                                <span className="lead col-md-2">
                                                    <label className="lead">Page {'  '}</label>
                                                    <label className="lead m-2">
                                                        {pageIndex + 1} of {pageOptions.length}
                                                    </label>
                                                </span>



                                                <span className="form-group">
                                                    <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} className="m-2" >
                                                        {
                                                            [5, 10, 20, 30].map(pageSize => (
                                                                <option key={pageSize} value={pageSize}>
                                                                    Show {pageSize}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                                </span>


                                                <div>
                                                    <span>
                                                        <small>Go to Page : {' '}</small>
                                                        <input
                                                            type="number"
                                                            defaultValue={pageIndex + 1}
                                                            className="form-group col-md-2 m-2"
                                                            onChange={(e) => {
                                                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                                                                gotoPage(pageNumber)
                                                            }}

                                                        />
                                                    </span>

                                                </div>


                                                <button
                                                    type="button"
                                                    className="btn btn-sm"
                                                    onClick={() => gotoPage(0)} disabled={!canPreviousPage}
                                                >
                                                    <FcPrevious />

                                                </button>
                                                <button type="button" className="btn btn-primary btn-sm m-2" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                                                <button type="button" className="btn btn-primary btn-sm m-2" onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                                                <button type="button"
                                                    className="btn btn-sm"
                                                    onClick={() => gotoPage(pageCount - 1)}
                                                    disabled={!canNextPage}
                                                >
                                                    <FcNext />
                                                </button>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                    }

                </div>
            </div>
        </>
    )
}
