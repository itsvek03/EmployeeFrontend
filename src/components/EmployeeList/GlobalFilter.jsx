import React from 'react'
import { TextField } from '@material-ui/core'
const GlobalFilter = ({filter,setfilter}) => {
    return (
        <div className="container-fluid mt-4">
            <form>
                <div className="col-md-12 col-sm-11">
                    <TextField
                        id="Search"
                        label="Search"
                        variant="outlined"
                        autoComplete="off"
                        value={filter||''}
                        fullWidth
                        onChange={(e) => setfilter(e.target.value)}
                    />
                </div>
            </form>
        </div>
    )
}

export default GlobalFilter;
