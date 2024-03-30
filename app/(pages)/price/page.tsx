import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/footer";

export default function GTC() {
  return (
    <>
      <div className="bg-secondary flex flex-col text-center justify-center h-screen overflow-hidden w-full">
        <div className="w-full  h-screen overflow-auto">
          <span className="text-5xl mt-5 font-bold pl-6">
            <h1 className="bg-gradient-to-r from-green-600 via-violet-900-500 to-green-950  inline-block text-transparent bg-clip-text p-5">
            Preise und Leistungen
            </h1>
          </span>
          <div className="h-fit flex justify-center items-center w-fit p-40 ml-24">
          <Tabs
              defaultValue="CH-de addresses"
              className="w-full md:text-sm text-xl overflow-scroll"
            >
              <TabsList className="grid w-full grid-cols-4 mb-2">
                <TabsTrigger className="text-lg p-0  " value="CH-de addresses">
                  CH-de Adressen
                </TabsTrigger>
                <TabsTrigger className="text-lg p-0 " value="Sale of company">
                  Unternehmensverkauf
                </TabsTrigger>
                <TabsTrigger className="text-lg p-0 " value="Market analysis">
                  Marktanalyse
                </TabsTrigger>
                <TabsTrigger
                  className="text-lg p-0 "
                  value="Customer value (analysis)"
                >
                  Kundenwert (-analyse)
                </TabsTrigger>
              </TabsList>
              <TabsContent value="CH-de addresses">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Individuelle Kontaktinformationen von CH-de Firmen:
                    </CardTitle>
                    <CardDescription className="text-xl p-10">
                      Sie wissen, was Sie suchen und benötigen lediglich die
                      richtigen Informationen von uns. Gerne liefern wir Ihnen
                      diese Informationen gemäss Ihren Spezifikationen.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </TabsContent>
              <TabsContent value="Sale of company">
                <Card>
                  <CardHeader>
                    <CardTitle></CardTitle>
                    <CardDescription className="text-xl p-10">
                      Der schwierigste Teil im Unternehmensverkauf ist die Suche
                      nach passenden Käufern. Gerne unterstützen wir Sie in
                      diesem Bereich.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </TabsContent>
              <TabsContent value="Market analysis">
                <Card>
                  <CardHeader>
                    <CardTitle>Marktforschung neu gedacht:</CardTitle>
                    <CardDescription className="text-xl p-10">
                      Unsere Datenbank (KI/AI) versteht unsere Suchanfragen.
                      Dies führt dazu, dass wir komplet neue Antworten erhalten.
                      Seit 30 Jahren arbeite ich in der Marktforschung und so
                      etwas hätte ich nie für möglich gehalten. Kurz, wir
                      analysieren und visualisieren Ihre Suchanfragen und
                      Ergebnisse. Bei Bedarf auch investigativ.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </TabsContent>
              <TabsContent value="Customer value (analysis)">
                <Card>
                  <CardHeader>
                    <CardTitle>Neue, vergleichbare Kunden finden:</CardTitle>
                    <CardDescription className="text-xl p-10">
                      Basierend auf einer Kundenwertanalyse mit Ihren
                      bestehenden Kunden suchen wir vergleichbare, neue
                      Unternehmen. Eine solche Analyse ist von doppeltem Nutzen.
                      Erstens wissen Sie, welche “neuen” Firmen Sie mit welchen
                      Argumenten ansprechen müssen. Zweitens wissen Sie
                      anschliessen, welche Ihrer Kunden wertvoll sind.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
