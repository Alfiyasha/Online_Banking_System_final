using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Online_Banking_System.web.Models
{
    public class Register
    {
            //All the square bracket functions or DataAnnotations can be used for Validations on Form submit
            [Required]
            [StringLength(20, MinimumLength = 3)]

            public string Name { get; set; }
            [Required]
            [Display(Name = "Date Of Birth* :")]
            [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MMM/yyyy}")]

            public DateTime DOB { get; set; }
            [Required]
            [StringLength(12)]
            public string Phone { get; set; }
            [Required]
            [StringLength(50, MinimumLength = 7)]
            public string Email { get; set; }
            [Required]
            public string Address { get; set; }
            [Required]
            [Display(Name = "User Name*")]
            public string username { get; set; }
            [Required]
            [Display(Name = "Password*")]
            public string password { get; set; }
        
            [Required]
            public string AccountType { get; set; }
        }
}

