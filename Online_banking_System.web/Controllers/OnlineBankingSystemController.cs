using Online_banking_System.web.Models;
using Online_Banking_System.Data;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace Online_banking_System.web.Controllers
{
    public class OnlineBankingSystemController : ApiController
    {
        BankSystemEntities entities = new BankSystemEntities();
        [System.Web.Http.Route("api/OnlineBankingSystem/Balance")]
        [System.Web.Http.HttpGet]

        public float? Balance()
        {
            var Bal = 0;
            var User = AccountController.UserID;
            if (User != null)
            {
                
              var Balance = entities.Accounts.FirstOrDefault(user => user.CustId == User).Balance;
                return Balance;
            }
            return Bal;
        }

        [System.Web.Http.HttpPost]

        [System.Web.Http.Route("api/OnlineBankingSystem/AmountTransfer")]
        public void AmountTransfer(Transfer transfer)
        {
            transfer.username = entities.Customers.Find(AccountController.UserID).Username;
            ObjectParameter text = new ObjectParameter("text", typeof(string));
            entities.UPDATE_TRANSACTION(transfer.username, transfer.AccountNumber, transfer.AccountHolder, transfer.Amount,text);
        }

        [System.Web.Http.Route("api/OnlineBankingSystem/MyTransactions")]
        [System.Web.Http.HttpGet]
        public IEnumerable<View_Transaction_Result> MyTransactions()
        {
            return entities.View_Transaction(AccountController.UserName).ToList();
        }
    }
}
