using System;
using System.Collections.Generic;

namespace api.Dtos
{
    public class EmployeesForOrderListDto
    {
        public int EmployeeId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Title { get; set; }
        public string TitleOfCourtesy { get; set; }
    }
}