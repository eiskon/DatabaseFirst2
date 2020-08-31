using System;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos
{
    public class EmployeeForRegisterDto
    {
        [Required]
        public string LastName { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify password between 4 and 8 characters")]
        public string Password { get; set; }

        [Required]
        public string TitleOfCourtesy { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Region { get; set; }

        [Required]
        public string PostalCode { get; set; }

        [Required]
        public string Country { get; set; }
        
        [Required]
        public string HomePhone { get; set; }
         [Required]
        public DateTime Created { get; set; }

        public DateTime LastUpdate { get; set; }

        public EmployeeForRegisterDto()
        {
            Created = DateTime.Now;
            LastUpdate = DateTime.Now;
        }

    }
}