import React, { useEffect, useRef, useState } from "react";
import { FileText, Users, AlertTriangle, BookOpen, ChevronUp, Clock } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface DraggableBottomSheetProps {
  onNavigate: (screen: string) => void;
}

export function DraggableBottomSheet({ onNavigate }: DraggableBottomSheetProps) {
  const MIN = 180;
  const TOP_SNAP_MARGIN = 10;   // px near top to auto-latch
  const UNLATCH_DRAG_PX = 16;   // pull-down needed to unlatch

  const getMax = () => Math.floor(window.innerHeight * 0.9); // ~90% viewport
  const [maxHeight, setMaxHeight] = useState(getMax());
  const [height, setHeight] = useState<number>(MIN);
  const [isDragging, setIsDragging] = useState(false);
  const [latched, setLatched] = useState(false);

  // drag state
  const startY = useRef(0);
  const startHeight = useRef(0);
  const beganLatched = useRef(false);
  const handleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onResize = () => setMaxHeight(getMax());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ---- Pointer event logic (robust on mobile & desktop) ----
  useEffect(() => {
    const h = handleRef.current;
    if (!h) return;

    const onPointerDown = (e: PointerEvent) => {
      // Only left click / primary touch
      if (e.button !== 0 && e.pointerType === "mouse") return;

      beganLatched.current = latched;
      setIsDragging(true);
      startY.current = e.clientY;
      startHeight.current = height;

      // capture the pointer so moves keep coming to us
      h.setPointerCapture(e.pointerId);
      // prevent page scroll while dragging
      e.preventDefault();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;

      const deltaY = startY.current - e.clientY; // up = positive
      if (beganLatched.current || latched) {
        const pulledDown = -deltaY; // positive if dragging down
        if (pulledDown < UNLATCH_DRAG_PX) {
          setHeight(maxHeight); // keep pinned
          return;
        }
        // unlatch and continue drag
        beganLatched.current = false;
        setLatched(false);
        startHeight.current = maxHeight;
      }

      const next = Math.min(Math.max(startHeight.current + deltaY, MIN), maxHeight);
      setHeight(next);
      e.preventDefault();
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      setIsDragging(false);

      // near top? latch
      if (maxHeight - height <= TOP_SNAP_MARGIN) {
        setHeight(maxHeight);
        setLatched(true);
      } else {
        // snap to nearest (min / mid / max)
        const mid = (MIN + maxHeight) / 2;
        const targets = [MIN, mid, maxHeight];
        const nearest = targets.reduce((a, b) =>
          Math.abs(height - a) < Math.abs(height - b) ? a : b
        );
        setHeight(nearest);
        setLatched(nearest === maxHeight);
      }

      // release capture
      try { h.releasePointerCapture(e.pointerId); } catch {}
      e.preventDefault();
    };

    h.addEventListener("pointerdown", onPointerDown);
    h.addEventListener("pointermove", onPointerMove);
    h.addEventListener("pointerup", onPointerUp);
    h.addEventListener("pointercancel", onPointerUp);
    return () => {
      h.removeEventListener("pointerdown", onPointerDown);
      h.removeEventListener("pointermove", onPointerMove);
      h.removeEventListener("pointerup", onPointerUp);
      h.removeEventListener("pointercancel", onPointerUp);
    };
  }, [height, isDragging, latched, maxHeight]);

  const recentAlerts = [
    { id: 1, title: "Suspicious activity near East Garage", time: "15 min ago", severity: "high" },
    { id: 2, title: "Weather alert: Heavy rain expected", time: "1 hour ago", severity: "medium" },
  ];
  const quickActions = [
    { id: "report", label: "Report Incident", icon: FileText, color: "bg-blue-500" },
    { id: "safewalk", label: "Safe Walk", icon: Users, color: "bg-green-500" },
    { id: "map", label: "Danger Zones", icon: AlertTriangle, color: "bg-orange-500" },
    { id: "resources", label: "Resources", icon: BookOpen, color: "bg-purple-500" },
  ];

  return (
    <div
      className={[
        "absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 select-none pointer-events-auto",
        // animate only when not dragging
        isDragging ? "" : "transition-[height] duration-300 ease-out",
      ].join(" ")}
      style={{ height }}
    >
      {/* Drag region (bigger than just the pill) */}
      <div
        ref={handleRef}
        className="w-full pt-3 pb-2 cursor-grab active:cursor-grabbing flex flex-col items-center gap-2"
        style={{ touchAction: "none" }} // disables native scrolling during drag
      >
        <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        {/* Optional title area acts as part of drag handle to make it easier to grab */}
        <div className="text-xs text-gray-500">Drag up for alerts & actions</div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 overflow-y-auto h-[calc(100%-56px)]">
        {height === MIN && (
          <div className="flex items-center justify-center mb-4">
            <ChevronUp className="w-5 h-5 text-gray-400 animate-bounce" />
          </div>
        )}

        {/* Recent Alerts */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3>Recent Alerts</h3>
            <button onClick={() => onNavigate("alerts")} className="text-sm text-[#0c7f99] hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-2">
            {recentAlerts.map((alert) => (
              <Card
                key={alert.id}
                className={`p-3 border-l-4 ${
                  alert.severity === "high" ? "border-l-red-500" : "border-l-orange-500"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-sm">{alert.title}</p>
                    <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{alert.time}</span>
                    </div>
                  </div>
                  <Badge
                    className={
                      alert.severity === "high"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }
                  >
                    {alert.severity.toUpperCase()}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Card
                  key={action.id}
                  className="p-4 hover:shadow-lg transition-all cursor-pointer active:scale-95"
                  onClick={() => onNavigate(action.id)}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={`${action.color} p-3 rounded-2xl text-white`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-sm">{action.label}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Safety Tip */}
        {height > MIN + 100 && (
          <div className="mt-6">
            <Card className="p-4 bg-gradient-to-r from-[#0c7f99]/10 to-[#1e3a8a]/10 border-[#0c7f99]/20">
              <div className="flex items-start space-x-3">
                <div className="bg-[#0c7f99] text-white p-2 rounded-lg">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[#0c7f99]">Safety Tip</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Always walk in well-lit areas and stay aware of your surroundings. Use the Safe Walk feature when traveling alone at night.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
