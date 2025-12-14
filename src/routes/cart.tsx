import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/cart-context";
import { Trash2, Plus, Minus, ShoppingBag, FileText, Download, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pdf, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

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
const InvoicePDF = ({ items, totalPrice, invoiceNumber, date }: {
  items: Array<{ product: { code: string; name: string; price: number }; quantity: number }>;
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

function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();
  const [showInvoice, setShowInvoice] = useState(false);

  const handleCheckout = () => {
    setShowInvoice(true);
  };

  const handleDownloadPDF = async () => {
    const invoiceNumber = `INV-${Date.now()}`;
    const date = new Date().toLocaleDateString("fa-IR");
    const doc = <InvoicePDF 
      items={items} 
      totalPrice={getTotalPrice()} 
      invoiceNumber={invoiceNumber}
      date={date}
    />;
    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `فاکتور-${invoiceNumber}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleBackToCart = () => {
    setShowInvoice(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <ShoppingBag className="w-24 h-24 text-slate-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              سبد خرید شما خالی است
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              برای افزودن محصول به سبد خرید، به صفحه محصولات بروید
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Invoice View
  if (showInvoice) {
    const invoiceNumber = `INV-${Date.now()}`;
    const date = new Date().toLocaleDateString("fa-IR");
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-6 flex items-center justify-between">
            <Button variant="outline" onClick={handleBackToCart}>
              <ArrowRight className="ml-2 w-4 h-4" />
              بازگشت به سبد خرید
            </Button>
            <Button onClick={handleDownloadPDF}>
              <Download className="ml-2 w-4 h-4" />
              دانلود PDF
            </Button>
          </div>

          <Card className="bg-white">
            <CardHeader>
              <div className="text-center">
                <CardTitle className="text-3xl mb-4">فاکتور فروش</CardTitle>
                <div className="flex justify-between text-sm text-gray-600">
                  <div>
                    <p>شماره فاکتور: {invoiceNumber}</p>
                  </div>
                  <div>
                    <p>تاریخ: {date}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>کد محصول</TableHead>
                    <TableHead>نام محصول</TableHead>
                    <TableHead>قیمت واحد</TableHead>
                    <TableHead>تعداد</TableHead>
                    <TableHead>جمع</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => {
                    const total = item.product.price * item.quantity;
                    return (
                      <TableRow key={item.product.id}>
                        <TableCell className="font-mono">
                          {item.product.code}
                        </TableCell>
                        <TableCell>{item.product.name}</TableCell>
                        <TableCell className="text-green-600">
                          {item.product.price.toLocaleString("fa-IR")} تومان
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell className="text-green-600 font-bold">
                          {total.toLocaleString("fa-IR")} تومان
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">جمع کل:</span>
                  <span className="text-2xl font-bold text-green-600">
                    {getTotalPrice().toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">سبد خرید</h1>
          <p className="text-slate-300">
            {getTotalItems()} محصول در سبد خرید شما
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">محصولات</CardTitle>
                  <Button variant="destructive" size="sm" onClick={clearCart}>
                    <Trash2 className="ml-2 w-4 h-4" />
                    پاک کردن همه
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">کد محصول</TableHead>
                      <TableHead className="text-slate-300">
                        نام محصول
                      </TableHead>
                      <TableHead className="text-slate-300">
                        قیمت واحد
                      </TableHead>
                      <TableHead className="text-slate-300">تعداد</TableHead>
                      <TableHead className="text-slate-300">جمع</TableHead>
                      <TableHead className="text-slate-300">عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => {
                      const total = item.product.price * item.quantity;
                      return (
                        <TableRow
                          key={item.product.id}
                          className="border-slate-700"
                        >
                          <TableCell className="text-white font-mono">
                            {item.product.code}
                          </TableCell>
                          <TableCell className="text-white">
                            {item.product.name}
                          </TableCell>
                          <TableCell className="text-green-400">
                            {item.product.price.toLocaleString("fa-IR")} تومان
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1
                                  )
                                }
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value) || 1;
                                  updateQuantity(item.product.id, value);
                                }}
                                min={1}
                                max={item.product.stock}
                                className="w-20 text-center"
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity + 1
                                  )
                                }
                                disabled={item.quantity >= item.product.stock}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-green-400 font-bold">
                            {total.toLocaleString("fa-IR")} تومان
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => removeFromCart(item.product.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700 sticky top-4">
              <CardHeader>
                <CardTitle className="text-white">خلاصه سفارش</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-slate-300">
                  <span>تعداد کل:</span>
                  <span className="font-bold text-white">
                    {getTotalItems()} عدد
                  </span>
                </div>
                <div className="border-t border-slate-700 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-lg">جمع کل:</span>
                    <span className="text-green-400 font-bold text-2xl">
                      {getTotalPrice().toLocaleString("fa-IR")} تومان
                    </span>
                  </div>
                </div>
                <Button className="w-full mt-6" size="lg" onClick={handleCheckout}>
                  <FileText className="ml-2 w-4 h-4" />
                  ادامه خرید
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
