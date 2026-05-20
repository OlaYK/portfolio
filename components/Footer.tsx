'use client';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <span>(c) {currentYear} Olayinka Daniel</span>
            <span>Lagos, Nigeria</span>
            <span>Built with precision.</span>
        </footer>
    );
}
