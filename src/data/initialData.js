export const initialData = {
  personalInfo: {
    name: "Tu Nombre Completo",
    title: "Título Profesional",
    email: "correo@ejemplo.com",
    phone: "+1 234 567 890",
    location: "Ciudad, País",
    website: "linkedin.com/in/tuusuario",
  },
  sections: [
    {
      id: "summary",
      type: "text",
      title: "Resumen Profesional",
      content: "Escribe aquí un breve resumen de tu trayectoria y objetivos.",
    },
    {
      id: "experience",
      type: "list",
      title: "Experiencia Profesional",
      items: [
        {
          id: "exp-1",
          company: "Nombre de la Empresa",
          position: "Cargo Ocupado",
          location: "Ciudad",
          startDate: "Jan 2022",
          endDate: "Present",
          description:
            "Describe tus logros y responsabilidades principales aquí.",
        },
      ],
    },
    {
      id: "education",
      type: "list",
      title: "Educación",
      items: [
        {
          id: "edu-1",
          school: "Universidad / Instituto",
          degree: "Grado / Certificación",
          location: "Ciudad",
          startDate: "2018",
          endDate: "2022",
          description: "",
        },
      ],
    },
    {
      id: "skills",
      type: "tags",
      title: "Habilidades",
      items: ["React", "JavaScript", "Tailwind CSS", "Git"],
    },
  ],
};
