using System;
using api.Model;
using System.Linq;
using System.Collections.Generic;

namespace api.application
{
    public class EmployeeUseCases
    {
         public static OperationResult<IEnumerable<Orders>> GetOrders(int employeeId, Func<Orders, bool> filter)
        {
            var ordersResult = GetEmployee(employeeId);
            if (ordersResult.IsSuccess == false)
            {
                return OperationResult<IEnumerable<Orders>>.Failure(ResultType.NotFound, new { EmployeeId = employeeId, Orders = "not found" });
            }

            var result = _orders.Where(filter);

            return result.Any() == false
                    ? OperationResult<IEnumerable<Orders>>.Failure(ResultType.NotFound, new { EmployeeId = employeeId, Orders = "not found" })
                    : OperationResult<IEnumerable<Orders>>.Success(result);
        }

         public static OperationResult<Employees> GetEmployee(int employeeId)
        {
            var employee = _employee.FirstOrDefault(x => x.EmployeeId == employeeId);
            return employee == null
                    ? OperationResult<Employees>.Failure(ResultType.NotFound, new { EmployeeId = employeeId })
                    :
                     OperationResult<Employees>.Success(employee);
        }

        public static OperationResult<Orders> AddToOrders(int employeeId, Orders input)
        {
            var employeeResult = GetEmployee(employeeId);
            if (employeeResult.IsSuccess == false)
            {
                return OperationResult<Orders>.Failure(ResultType.NotFound, new { EmployeeId = employeeId, Orders = input });
            }

            return AddToOrders(employeeResult.Result, input);
        }

        public static OperationResult<Orders> AddToOrders(Employees employee, Orders input)
        {
            input.Employee = employee;
            input.EmployeeId = new Random().Next(0,100);
            input.Freight = new Random().Next(0, 500);

            _orders.Add(input);

            return OperationResult<Orders>.Success(input);
        }

        public static OperationResult<Orders> Update(int employeeId, Orders update)
        {
            var articleResult = GetOrders(employeeId, x => x.OrderId == update.OrderId && x.OrderId == update.OrderId);
            if (articleResult.IsSuccess == false)
            {
                return OperationResult<Orders>.Failure(ResultType.NotFound, new { EmployeeId = employeeId, Orders = update });
            }

            var order = articleResult.Result.Single();
            order.Freight = update.Freight;

            return OperationResult<Orders>.Success(order);
        }

        public static OperationResult<Orders> Delete(int employeeId, int id)
        {
            var orderResult = GetOrders(employeeId, x => x.OrderId == id);
            if (orderResult.IsSuccess == false)
            {
                return OperationResult<Orders>.Failure(ResultType.NoContent, string.Empty);
            }

            var order = orderResult.Result.Single();
            _orders.Remove(order);

            return OperationResult<Orders>.Success(order);
        }

           static EmployeeUseCases()
        {
            _employee  = new List<Employees>()
            {
                new Employees
                {
                    EmployeeId = 1,
                    LastName = "employee-99"
                },
                new Employees
                {
                    EmployeeId = 2,
                    LastName = "employee-100"
                }
            };

            _orders = new List<Orders>()
            {
                new Orders
                {
                    OrderId = 1,
                    Employee = _employee.First(),
                    ShipPostalCode = "1234"
                },
                new Orders
                {
                    OrderId = 2,
                    Employee = _employee.First(),
                    ShipPostalCode = "2345"
                },
                new Orders
                {
                    OrderId = 3,
                    Employee = _employee.Last(),
                    ShipPostalCode = "3456"
                }
            };
        }

        private static List<Orders> _orders;
        private static List<Employees> _employee;
    }
}