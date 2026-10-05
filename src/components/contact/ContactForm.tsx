import React, { useState } from 'react';
import type { ContactFormData, SubjectType } from '../../types/contact';
import { CONTACT_DETAILS } from '../../data/contactInfo';

const INITIAL_FORM: ContactFormData = {
  fullName: '',
  email: '',
  phone: '',
  subject: 'pedido-especial',
  message: '',
};

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const subjectLabels: Record<SubjectType, string> = {
    'pedido-especial': 'Pedido Especial / Pastel Personalizado',
    'duda-general': 'Duda sobre Ingredientes o Procesos',
    'evento': 'Mesa de Panadería para Evento',
    'taller': 'Consulta sobre Horarios o Recogida',
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Por favor completa todos los campos requeridos (*).');
      return;
    }

    setErrorMsg(null);

    // Formatear mensaje pre-redactado para WhatsApp
    const messageLines = [
      `🍞 *Nuevo mensaje desde el sitio web de Miga*`,
      `*Nombre:* ${formData.fullName.trim()}`,
      `*Correo:* ${formData.email.trim()}`,
      formData.phone ? `*Teléfono:* ${formData.phone.trim()}` : null,
      `*Motivo:* ${subjectLabels[formData.subject]}`,
      `*Mensaje:*`,
      formData.message.trim(),
    ].filter(Boolean);

    const encodedText = encodeURIComponent(messageLines.join('\n'));
    const whatsappUrl = `https://wa.me/${CONTACT_DETAILS.whatsappNumber}?text=${encodedText}`;

    // Abrir WhatsApp en nueva pestaña
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] shadow-xs">
      <div className="mb-6">
        <span className="text-xs font-sans tracking-widest text-[#A06136] uppercase font-semibold">
          Canal Directo
        </span>
        <h3 className="font-serif text-2xl font-bold text-[#2B1810] mt-1">
          Escríbenos tu Consulta
        </h3>
        <p className="font-sans text-xs text-[#6B5E55] mt-1.5 leading-relaxed">
          Llena el formulario y al enviar se abrirá WhatsApp con todos tus datos listos para atención inmediata.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-sans">
          {errorMsg}
        </div>
      )}

      {submitted ? (
        <div className="py-10 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF7F2] border border-[#A06136] text-[#A06136] flex items-center justify-center">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 className="font-serif text-xl font-bold text-[#2B1810]">
            ¡Mensaje preparado con éxito!
          </h4>
          <p className="font-sans text-xs text-[#6B5E55] max-w-sm mx-auto leading-relaxed">
            Se ha abierto tu chat de WhatsApp con la información. Si la ventana no abrió, puedes hacer clic aquí:
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData(INITIAL_FORM);
              }}
              type="button"
              className="px-5 py-2 rounded-full text-xs font-semibold bg-[#FAF7F2] text-[#2B1810] border border-[#E8E2D9] hover:bg-[#E8E2D9]"
            >
              Escribir otro mensaje
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Nombre */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-medium text-[#2B1810] mb-1">
              Nombre completo <span className="text-[#A06136]">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Ej. Sofía Hernández"
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] text-xs font-sans text-[#2B1810] placeholder-[#6B5E55]/60 focus:outline-none focus:ring-1 focus:ring-[#A06136]"
            />
          </div>

          {/* Email y Teléfono en 2 columnas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-[#2B1810] mb-1">
                Correo electrónico <span className="text-[#A06136]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="sofia@ejemplo.com"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] text-xs font-sans text-[#2B1810] placeholder-[#6B5E55]/60 focus:outline-none focus:ring-1 focus:ring-[#A06136]"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-medium text-[#2B1810] mb-1">
                Teléfono / WhatsApp <span className="text-[10px] text-[#6B5E55]">(Opcional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="55 1234 5678"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] text-xs font-sans text-[#2B1810] placeholder-[#6B5E55]/60 focus:outline-none focus:ring-1 focus:ring-[#A06136]"
              />
            </div>
          </div>

          {/* Motivo de Consulta */}
          <div>
            <label htmlFor="subject" className="block text-xs font-medium text-[#2B1810] mb-1">
              ¿En qué podemos ayudarte?
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] text-xs font-sans text-[#2B1810] focus:outline-none focus:ring-1 focus:ring-[#A06136] cursor-pointer"
            >
              <option value="pedido-especial">Pedido Especial / Pastel Personalizado</option>
              <option value="duda-general">Duda sobre Ingredientes / Masa Madre</option>
              <option value="evento">Panadería para Evento o Mesa de Postres</option>
              <option value="taller">Consulta de Ubicación o Recogida</option>
            </select>
          </div>

          {/* Mensaje */}
          <div>
            <label htmlFor="message" className="block text-xs font-medium text-[#2B1810] mb-1">
              Detalle de tu mensaje <span className="text-[#A06136]">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Cuéntanos fechas deseadas, número de comensales o tu duda específica..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] text-xs font-sans text-[#2B1810] placeholder-[#6B5E55]/60 focus:outline-none focus:ring-1 focus:ring-[#A06136] resize-none"
            />
          </div>

          {/* Botón WhatsApp */}
          <button
            type="submit"
            className="w-full mt-2 py-3.5 px-6 rounded-2xl text-xs font-semibold tracking-wide text-white bg-[#2B1810] hover:bg-[#3D2317] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 shadow-sm cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current text-[#FAF7F2]" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.026.565 1.777.783 2.806.783 3.182 0 5.768-2.587 5.768-5.766.001-3.18-2.585-5.766-5.768-5.766zm9.969 5.766c0 5.503-4.477 9.98-9.97 9.98-1.748 0-3.385-.453-4.819-1.242l-5.211 1.366 1.393-5.086c-.889-1.488-1.393-3.228-1.393-5.088 0-5.503 4.477-9.98 9.97-9.98 5.493 0 9.97 4.477 9.97 9.98z" />
            </svg>
            Enviar Mensaje a WhatsApp
          </button>
        </form>
      )}
    </div>
  );
};