import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getdata } from '../Redux/Appreducer/actions';
const Data = () => {
    const { data } = useSelector((state) => state);
    // console.log(data,"data");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getdata());
    }, [data]);
    return (
        <Container className='mt-3'>
            <Table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Department</th>
                        <th>Job Title</th>
                        <th>Years Of Experience</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {data.data && data.data.map((item) => (
                        <tr key={item._id}>
                            <th>{item["FirstName"]}</th>
                            <th>{item["LastName"]}</th>
                            <th>{item.Email}</th>
                            <th>{item.Phone}</th>
                            <th>{item.Gender}</th>
                            <th>{item.Department}</th>
                            <th>{item["JobTitle"]}</th>
                            <th>{item["YearsOfExperience"]}</th>
                            <th>{item.Salary}</th>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default Data