import { PDFDownloadLink } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const MyDocument = ({ letter }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>{letter.title}</Text>
        <Text style={styles.date}>{letter.date}</Text>
      </View>
      <View style={styles.content}>
        <Text>{letter.content}</Text>
      </View>
      <View style={styles.footer}>
        <Text>Com amor, {letter.author}</Text>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: { padding: 30 },
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  date: { fontSize: 12, color: 'gray' },
  content: { marginVertical: 20 },
  footer: { marginTop: 30, fontSize: 12 }
});

const PdfExporter = ({ letter }) => (
  <PDFDownloadLink 
    document={<MyDocument letter={letter} />} 
    fileName={`carta-${letter.date}.pdf`}
  >
    {({ loading }) => (loading ? 'Preparando PDF...' : '📄 Exportar como PDF')}
  </PDFDownloadLink>
);

export default PdfExporter;