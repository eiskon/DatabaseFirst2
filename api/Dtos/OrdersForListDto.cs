using System;
using System.Collections.Generic;
using api.Model;

namespace api.Dtos
{
    public class OrdersForListDto
    {
        public int OrderId { get; set; }
        public int? EmployeeId { get; set; }
        public DateTime? OrderDate { get; set; }
        public int? ShipVia { get; set; }
        public string ShipAddress { get; set; }
        public EmployeesForOrderListDto Employee { get; set; }
    }
}