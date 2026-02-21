import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register a cleaner font if possible, but defaults are safer for now
// Font.register({ family: 'Inter', src: '...' }); 

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#1e293b',
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#0f172a',
    paddingBottom: 12,
    marginBottom: 20,
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#0f172a',
    marginBottom: 2,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1d4ed8',
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    color: '#475569',
    fontSize: 9,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    color: '#0f172a',
    paddingBottom: 2,
    marginBottom: 8,
  },
  textSection: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#334155',
  },
  listItem: {
    marginBottom: 10,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  company: {
    fontWeight: 'bold',
    color: '#0f172a',
  },
  dateRange: {
    fontStyle: 'italic',
    color: '#64748b',
    fontSize: 8,
  },
  listSubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  position: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#334155',
  },
  location: {
    textTransform: 'uppercase',
    fontSize: 7,
    color: '#64748b',
  },
  description: {
    fontSize: 8.5,
    lineHeight: 1.4,
    color: '#475569',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    fontSize: 9,
    color: '#334155',
  }
});

const CVDocument = ({ data }) => {
  const { personalInfo, sections } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name}</Text>
          <Text style={styles.title}>{personalInfo.title}</Text>
          <View style={styles.contactRow}>
            {personalInfo.email && <Text>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text>• {personalInfo.phone}</Text>}
            {personalInfo.location && <Text>• {personalInfo.location}</Text>}
            {personalInfo.website && <Text>• {personalInfo.website}</Text>}
          </View>
        </View>

        {/* Sections */}
        <View>
          {sections.map((section) => (
            <View key={section.id} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              
              {section.type === 'text' && (
                <Text style={styles.textSection}>{section.content}</Text>
              )}

              {section.type === 'list' && (
                <View>
                  {section.items.map((item) => (
                    <View key={item.id} style={styles.listItem}>
                      <View style={styles.listHeader}>
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.dateRange}>{item.startDate} — {item.endDate}</Text>
                      </View>
                      <View style={styles.listSubHeader}>
                        <Text style={styles.position}>{item.position}</Text>
                        <Text style={styles.location}>{item.location}</Text>
                      </View>
                      {item.description && (
                        <Text style={styles.description}>{item.description}</Text>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {section.type === 'tags' && (
                <View style={styles.tagContainer}>
                  <Text style={styles.tag}>
                    {section.items.join(' • ')}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default CVDocument;
