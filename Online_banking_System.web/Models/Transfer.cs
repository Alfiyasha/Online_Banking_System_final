using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Online_banking_System.web.Models
{
    public class Transfer
    {
        public string username { get; set; }
        public string AccountNumber { get; set; }
        public string AccountHolder { get; set; }
        public float Amount { get; set; }
    }
}