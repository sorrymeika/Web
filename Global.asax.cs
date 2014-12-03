using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace SL.Web
{
    // 注意: 有关启用 IIS6 或 IIS7 经典模式的说明，
    // 请访问 http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Item",
                "{handle}/{id}.html",
                new { controller = "Core", action = "Index", catalog = "Item" },
                new { handle = "^Item$", id = "^\\d+$" }
            );

            routes.MapRoute(
                "News",
                "{handle}/{id}.html",
                new { controller = "Core", action = "Index", catalog = "News" },
                new { handle = "^News|NewsList|NewsSubList$", id = "^\\d+$" }
            );

            routes.MapRoute(
                "Lesson",
                "{handle}.html",
                new { controller = "Core", action = "Index", catalog = "Lesson" },
                new { handle = "^Lessons|Teacher$" }
            );

            #region 默认

            routes.MapRoute(
               "JsonDefault",
               "Json/{catalog}/{handle}",
               new { controller = "Core", action = "JsonAction", catalog = "", handle = "" }
            );

            routes.MapRoute(
               "Manage",
               "Manage/{catalog}/{handle}",
               new { controller = "Core", action = "Manage", catalog = "Login", handle = "" }
            );

            routes.MapRoute(
               "base64Image",
               "base64/{*image}",
               new { controller = "Core", action = "Base64Image" }
            );

            routes.MapRoute(
               "compressImage",
               "compress/{*image}",
               new { controller = "Core", action = "CompressImage" }
            );

            routes.MapRoute(
               "ImagePreview",
               "ImagePreview",
               new { controller = "Core", action = "ImagePreview" }
            );

            routes.MapRoute(
               "CheckCode",
               "CheckCode/{id}.jpg",
               new { controller = "Core", action = "CheckCode", id = @"\d+" }
            );
            #endregion

            routes.MapRoute(
                "Default",
                "{catalog}/{handle}",
                new { controller = "Core", action = "Index", catalog = "Core", handle = "Index" }
            );

        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            RegisterGlobalFilters(GlobalFilters.Filters);
            RegisterRoutes(RouteTable.Routes);
        }
    }
}