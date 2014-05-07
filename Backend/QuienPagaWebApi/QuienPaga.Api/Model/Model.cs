using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuienPaga.Api.Model
{
    public class DataModel
    {
        public DateTime? FECHA { get; set; }
        public string PARTIDO { get; set; }
        public string SECTOR { get; set; }
        public string PARTIDA { get; set; }
        public string ORIGEN { get; set; }
        public string DETALLE { get; set; }
        public double MONTO { get; set; }
    }
}