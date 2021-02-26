import React, { useEffect, useState } from 'react'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { Route, Switch } from 'react-router-dom'
import EmployeeList from './components/EmployeeList/EmployeeList'
import '../src/style/loader.css'

export default function App() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, []);

    return (
        <div className="conatiner-fluid">
            {
                loading ? (
                    <div className="loader">
                        <PropagateLoader size={40} color={'#9013FE'} loading={loading} />
                    </div>

                ) :

                    (
                        <div className="container-fluid">
                            <Switch>
                                <Route exact path="/" component={EmployeeList} />
                            </Switch>
                        </div>
                    )
            }
        </div>
    )
}
