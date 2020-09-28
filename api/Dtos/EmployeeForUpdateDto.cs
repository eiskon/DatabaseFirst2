using System;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos
{
    public class EmployeeForUpdateDto
    {
        [Required]
        public string LastName { get; set; }
        [Required]
        public string FirstName { get; set; }
        public string TitleOfCourtesy { get; set; }
        public DateTime? HireDate { get; set; }
        [Required]
        public string Address { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string HomePhone { get; set; }
        public string Notes { get; set; }
        public DateTime LastUpdate { get; set; }

        public EmployeeForUpdateDto()
        {
            LastUpdate = DateTime.Now;
        }
    }
}
