using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SL.Web.Model
{
    public class HtmlBlock
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public int Sort { get; set; }
    }
}