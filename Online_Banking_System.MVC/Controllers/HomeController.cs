using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using Online_Banking_System.MVC;

namespace Online_Banking_System.MVC.Controllers
{
    public class HomeController : Controller
    {
        Uri baseAddress = new Uri("https://localhost:44363/");
        HttpClient client;

        public HomeController()
        {
            client = new HttpClient();
            client.BaseAddress = baseAddress;
        }

       
    
        public ActionResult login()
        {
            return View();
        }

        public ActionResult Register()
        {

            return View();
        }

        public ActionResult Homepage()
        {
            return View();
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}