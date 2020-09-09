using System.Collections.Generic;

namespace api.Dtos
{
    public class OrderDetailsDto
    {

        public int ProductId { get; set; }
        public decimal UnitPrice { get; set; }
        public short Quantity { get; set; }
        public float Discount { get; set; }
        public ProductForOrdersDetailsDto Product { get; set; }
    }
}