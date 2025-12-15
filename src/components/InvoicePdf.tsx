import {  Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    direction: "rtl",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingVertical: 5,
  },
  tableCol: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#000",
    paddingHorizontal: 5,
  },
  tableColLast: {
    flex: 1,
    paddingHorizontal: 5,
  },
  tableCell: {
    fontSize: 10,
    padding: 5,
  },
  header: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
  total: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
});

// PDF Invoice Document
export const InvoicePDF = ({
  items,
  totalPrice,
  invoiceNumber,
  date,
}: {
  items: Array<{
    product: { code: string; name: string; price: number };
    quantity: number;
  }>;
  totalPrice: number;
  invoiceNumber: string;
  date: string;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>فاکتور فروش</Text>
      <Text style={{ marginBottom: 10 }}>شماره فاکتور: {invoiceNumber}</Text>
      <Text style={{ marginBottom: 20 }}>تاریخ: {date}</Text>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.header]}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>کد محصول</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>نام محصول</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>قیمت واحد</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>تعداد</Text>
          </View>
          <View style={styles.tableColLast}>
            <Text style={styles.tableCell}>جمع</Text>
          </View>
        </View>
        {items.map((item, index) => {
          const itemTotal = item.product.price * item.quantity;
          return (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.product.code}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.product.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {item.product.price.toLocaleString("fa-IR")} تومان
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.quantity}</Text>
              </View>
              <View style={styles.tableColLast}>
                <Text style={styles.tableCell}>
                  {itemTotal.toLocaleString("fa-IR")} تومان
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      <Text style={styles.total}>
        جمع کل: {totalPrice.toLocaleString("fa-IR")} تومان
      </Text>
    </Page>
  </Document>
);
