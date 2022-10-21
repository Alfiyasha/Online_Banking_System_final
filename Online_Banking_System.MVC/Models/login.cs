using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Online_Banking_System.MVC.Models
{
    public class login
    {
        [Required]
        [Display(Name = "User Name*")]
        public string username { get; set; }

        [Required]
        [Display(Name = "Password*")]
        public string password { get; set; }
    }
}