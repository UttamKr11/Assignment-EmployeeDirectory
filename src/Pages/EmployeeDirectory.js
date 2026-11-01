import { useEffect, useState } from 'react';
import { EmployeeCard } from '../components/EmployeeCard';
import { Loader } from '../components/Loader/Loader';

export const EmployeeDirectory = () => {
    const [employeeList, setEmployeeList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        async function fetchEmployeeList() {
            try {
                await new Promise((resolve) => setTimeout(resolve, 2000));
                if (controller.signal.aborted) {
                    return;
                }

                const response = await fetch("https://jsonplaceholder.typicode.com/users", {
                    signal: controller.signal,
                });
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const data = await response.json();
                setEmployeeList(data);
            } catch (requestError) {
                if (!controller.signal.aborted) {
                    setError('Unable to load employees. Please try again later.');
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }

        fetchEmployeeList();

        return () => controller.abort();
    }, []);

    return (
        <div className="app-shell">
            {isLoading && <Loader />}
            {error && <p>{error}</p>}
            {!isLoading && !error && employeeList.map((employee) => (

                <EmployeeCard employee={employee} key={employee.id} />

            ))}
        </div>
    )
}
