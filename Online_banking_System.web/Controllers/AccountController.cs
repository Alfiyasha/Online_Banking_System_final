using Online_Banking_System.web.Models;
using Online_Banking_System.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity.Core.Objects;
using NLog;
using System.Diagnostics;

namespace Online_banking_System.web.Controllers
{
    public class AccountController : ApiController
    { 
        public static int UserID;
        public static string UserName;
        BankSystemEntities entities = new BankSystemEntities();
        [Route("api/Account/Register")]
        [HttpPost]
       
        public void Register(Register model)
        {

            if (ModelState.IsValid)
            {
                using (entities)
                {

                    ObjectParameter errorMessage = new ObjectParameter("errorMessage", typeof(string));
                    entities.INSERT_INTO_BANK_TABLES(model.Name, model.DOB, model.Phone, model.Email, model.Address, model.username, model.password, model.AccountType);
                    //entities.Customers.Add(model);
                    entities.SaveChanges();
                }


            }

        }

        [Route("api/Account/login")]
        [HttpPost]
        public HttpResponseMessage Login(login userLogin)
            {
                if (ModelState.IsValid)
                {
                    using (entities)
                    {
                    try
                    {
                        var _currentUser = entities.Customers.FirstOrDefault(user => user.Username == userLogin.username &&  user.Password == userLogin.password);

                        if (_currentUser != null)
                                {
                            UserID = _currentUser.Id;
                            UserName = userLogin.username;
                            var newUrl = this.Url.Content("https://localhost:44364/Home/Homepage");
                            //TODO: Redirect To Single app Page with this User
                                    return Request.CreateResponse(HttpStatusCode.Created,
                                                             new { Success = true, RedirectUrl = newUrl });
                                }
                            }
                            catch (Exception e)
                            {
                        /* logger.Error("Error Occoured During User Validation");
                         logger.Error(e);*/

                        Debug.WriteLine(e);

                            }




                        }



                    }
                
        /*Logger.Error("Invalid User");*/
        var testUrl = this.Url.Content("https://localhost:44364/Home/Index");
       
                return Request.CreateResponse(HttpStatusCode.Forbidden,
                                         new { Success = false, RedirectUrl = testUrl });
            }
        }
    }


    

