using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SL.Web.Model
{
    public class Link
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public int Sort { get; set; }
    }
}