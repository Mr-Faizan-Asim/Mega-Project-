import React, { useState } from "react";
import { SECTIONS } from "./constants/sections";

import Header from "./components/Header";
import SidebarNav from "./components/SidebarNav";
import MobileNav from "./components/MobileNav";
import ContactFooter from "./components/ContactFooter";
import HelpOverlay from "./components/HelpOverlay";
import AuthModal from "./components/AuthModal";

import HomeSection from "./sections/HomeSection";
import FaqSection from "./sections/FaqSection";
import AboutSection from "./sections/AboutSection";
import ReviewsSection from "./sections/ReviewsSection";
import ContactSection from "./sections/ContactSection";
import QaSection from "./sections/QaSection";
import DocumentBuilderSection from "./sections/DocumentBuilderSection";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("Megaplan user");
  const [activeSection, setActiveSection] = useState(SECTIONS.HOME);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("signin"); // 'signin' | 'signup'
  const [authMessage, setAuthMessage] = useState("");
  const [authForm, setAuthForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [helpOpen, setHelpOpen] = useState(false);

  const [docForm, setDocForm] = useState({
    recipientEmail: "",
    projectScope: "",
    knownRisks: "",
    disputePrevention: "",
    contactWording: "",
  });
  const [draftSummary, setDraftSummary] = useState("");

  const handleAuthFieldChange = (field, value) => {
    setAuthForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetAuthForm = () => {
    setAuthForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();

    if (authMode === "signup") {
      if (
        !authForm.firstName.trim() ||
        !authForm.lastName.trim() ||
        !authForm.email.trim() ||
        !authForm.password.trim()
      ) {
        setAuthMessage("Please complete all fields to create your account.");
        return;
      }

      setAuthMessage(
        "Account created. Please sign in with your email and password."
      );
      setAuthMode("signin");
      setUserName(authForm.firstName.trim() || "Megaplan user");
      setAuthForm((prev) => ({
        ...prev,
        password: "",
      }));
      return;
    }

    if (!authForm.email.trim() || !authForm.password.trim()) {
      setAuthMessage("Please enter your email and password to sign in.");
      return;
    }

    setIsAuthenticated(true);
    setShowAuthModal(false);
    setAuthMessage("");
    setUserName((prev) =>
      prev && prev !== "Megaplan user" ? prev : "Megaplan user"
    );
    resetAuthForm();
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setActiveSection(SECTIONS.HOME);
  };

  const navItemsPublic = [
    { id: SECTIONS.HOME, label: "Home" },
    { id: SECTIONS.FAQ, label: "FAQ" },
    { id: SECTIONS.ABOUT, label: "About us" },
    { id: SECTIONS.REVIEWS, label: "Reviews" },
  ];

  const navItemsPrivate = [
    ...navItemsPublic,
    { id: SECTIONS.CONTACT, label: "Contact" },
    { id: SECTIONS.QA, label: "Q&A Assistant" },
    { id: SECTIONS.DOC_BUILDER, label: "Document builder" },
  ];

  const navItems = isAuthenticated ? navItemsPrivate : navItemsPublic;

  const handleDocFormChange = (field, value) => {
    setDocForm((prev) => ({ ...prev, [field]: value }));
  };

  const buildDraftSummary = () => {
    const {
      recipientEmail,
      projectScope,
      knownRisks,
      disputePrevention,
      contactWording,
    } = docForm;

    const summaryLines = [
      recipientEmail && `Recipient: ${recipientEmail}`,
      projectScope && `Project scope: ${projectScope}`,
      knownRisks && `Key risks / points to highlight: ${knownRisks}`,
      disputePrevention &&
        `Dispute prevention notes / clarifications: ${disputePrevention}`,
      contactWording && `Preferred contact wording / tone: ${contactWording}`,
    ].filter(Boolean);

    const summaryText =
      summaryLines.length > 0
        ? `Draft compliance summary (prototype)\n\n${summaryLines.join(
            "\n\n"
          )}\n\nNext step: This draft will be refined by AI and prepared as a quote-ready compliance email to the project team.`
        : "Add some details above and click “Build draft summary” to generate a preview.";

    setDraftSummary(summaryText);
  };

  const openSignInFromHome = () => {
    setAuthMode("signin");
    setAuthMessage("");
    setShowAuthModal(true);
  };

  return (
    <div
      className="min-h-screen bg-black text-slate-100"
      style={{
        fontFamily:
          "'Open Sans', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Top header */}
      <Header
        isAuthenticated={isAuthenticated}
        userName={userName}
        onSignOut={handleSignOut}
        onSignInClick={openSignInFromHome}
      />

      {/* Main layout: sidebar + content */}
      <div className="flex">
        {/* Sidebar navigation (left) */}
        <SidebarNav
          navItems={navItems}
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />

        {/* Content area with wallpaper background */}
        <main className="relative flex-1 overflow-hidden">
          {/* background image */}
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/image1.jpg')" }}
          />

          {/* dark overlay above wallpaper */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-black/85" />

          {/* actual content */}
          <div className="relative z-20 px-4 py-5 md:px-8 md:py-8">
            {/* Mobile nav */}
            <MobileNav
              navItems={navItems}
              activeSection={activeSection}
              onSelectSection={setActiveSection}
            />

            {activeSection === SECTIONS.HOME && (
              <HomeSection
                isAuthenticated={isAuthenticated}
                onGetStarted={openSignInFromHome}
              />
            )}
            {activeSection === SECTIONS.FAQ && <FaqSection />}
            {activeSection === SECTIONS.ABOUT && <AboutSection />}
            {activeSection === SECTIONS.REVIEWS && <ReviewsSection />}
            {activeSection === SECTIONS.CONTACT && isAuthenticated && (
              <ContactSection />
            )}
            {activeSection === SECTIONS.QA && isAuthenticated && <QaSection />}
            {activeSection === SECTIONS.DOC_BUILDER && isAuthenticated && (
              <DocumentBuilderSection
                form={docForm}
                onChange={handleDocFormChange}
                onBuild={buildDraftSummary}
                draftSummary={draftSummary}
              />
            )}

            {!isAuthenticated &&
              (activeSection === SECTIONS.CONTACT ||
                activeSection === SECTIONS.QA ||
                activeSection === SECTIONS.DOC_BUILDER) && (
                <div className="mt-6 border border-dashed border-slate-700 bg-black/80 px-4 py-3 text-sm text-slate-100 rounded-lg">
                  Please sign in to access this area of the platform.
                </div>
              )}
          </div>
        </main>
      </div>

      {/* Contact footer (signed-in only, all pages except Contact) */}
      {isAuthenticated && activeSection !== SECTIONS.CONTACT && (
        <footer className="border-t border-slate-800 bg-black px-4 py-5 md:px-8">
          <ContactFooter />
        </footer>
      )}

      {/* Help button */}
      <button
        type="button"
        onClick={() => setHelpOpen(true)}
        className="fixed bottom-4 right-4 z-30 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2 focus:ring-offset-black"
      >
        Help
      </button>

      {/* Help overlay */}
      {helpOpen && <HelpOverlay onClose={() => setHelpOpen(false)} />}

      {/* Auth modal */}
      {showAuthModal && (
        <AuthModal
          authMode={authMode}
          setAuthMode={(mode) => {
            setAuthMode(mode);
            setAuthMessage("");
          }}
          authMessage={authMessage}
          authForm={authForm}
          onFieldChange={handleAuthFieldChange}
          onSubmit={handleAuthSubmit}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
}
